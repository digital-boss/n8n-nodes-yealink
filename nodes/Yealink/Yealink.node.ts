import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	ICredentialsDecrypted,
	ICredentialTestFunctions,
	IDataObject,
	ILoadOptionsFunctions,
	INodeCredentialTestResult,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
} from 'n8n-workflow';

import {
	deviceFields,
	deviceOperations,
	managerDeviceFields,
	managerDeviceOperations,
	regionFields,
	regionOperations,
	staffFields,
	staffOperations
} from './descriptions';

import {
	simplify,
	yealinkApiRequest,
} from './GenericFunctions';

import { OptionsWithUri } from 'request';

import { v4 as uuidv4 } from 'uuid';

import * as crypto from 'crypto';

export class Yealink implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Yealink',
		name: 'yealink',
		icon: 'file:yealink.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Yealink API',
		defaults: {
				name: 'Yealink',
				color: '#4C6363',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'yealinkApi',
				required: true,
				testedBy: 'testYealinkApiAuth',
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Device',
						value: 'device',
					},
					{
						name: 'Manager Device',
						value: 'managerDevice',
					},
					{
						name: 'Region',
						value: 'region',
					},
					{
						name: 'Staff',
						value: 'staff',
					},
				],
				default: 'device',
				required: true,
			},
			...deviceOperations,
			...deviceFields,
			...managerDeviceOperations,
			...managerDeviceFields,
			...regionOperations,
			...regionFields,
			...staffOperations,
			...staffFields,
			{
				displayName: 'Simplify Output',
				name: 'simplifyOutput',
				type: 'boolean',
				default: false,
				description: 'Simplify the output data',
			},
		],
	};

	// Endpoints:
	//
	// api/open/v1/manager/region/add
	// 					list
	// 	api/open/v1/manager/staff/addSip
	// 					list
	// api/open/v1/manager/staff/findPagedList
	// api/open/v1/manager/staff/add
	// api/open/v1/manager/device/edit
	// api/open/v1/device/add
	// api/open/v1/device/list
	// api/open/v1/device/checkDevice
	// api/open/v1/device/checkMac
	// api/open/v1/device/edit
	// api/open/v1/device/migrate
	// api/open/v1/device/delete

	methods = {
		loadOptions: {
			// Get all the Device IDs to display them to user so that he can
			// select them easily
			async getDeviceIds(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];

				const responseData = await yealinkApiRequest.call(this, 'POST', 'api/open/v1/device/list');

				for (const data of responseData.data) {
					returnData.push({
						name: data.id,
						value: data.id,
					});
				}

				returnData.sort((a, b) => {
					if (a.name < b.name) { return -1; }
					if (a.name > b.name) { return 1; }
					return 0;
				});

				return returnData;
			},

			// Get all the Device MACs to display them to user so that he can
			// select them easily
			async getDeviceMacs(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];

				const responseData = await yealinkApiRequest.call(this, 'POST', 'api/open/v1/device/list');

				for (const data of responseData.data) {
					returnData.push({
						name: data.mac,
						value: data.mac,
					});
				}

				returnData.sort((a, b) => {
					if (a.name < b.name) { return -1; }
					if (a.name > b.name) { return 1; }
					return 0;
				});

				return returnData;
			},

			// Get all the Server IDs to display them to user so that he can
			// select them easily
			async getServerIds(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];

				const responseData = await yealinkApiRequest.call(this, 'POST', 'api/open/v1/server/list');

				for (const data of responseData.data) {
					returnData.push({
						name: data.id,
						value: data.id,
					});
				}

				returnData.sort((a, b) => {
					if (a.name < b.name) { return -1; }
					if (a.name > b.name) { return 1; }
					return 0;
				});

				return returnData;
			},
		},

		credentialTest: {
			async testYealinkApiAuth(this: ICredentialTestFunctions, credential: ICredentialsDecrypted): Promise<INodeCredentialTestResult> {

				const endpoint = 'api/open/v1/device/list';
				const method = 'POST';
				const body: IDataObject = {
					limit: 1,
				};

				// Get key/secret
				const key = credential.data!.xCaKey as string;
				const secret = credential.data!.secret as string;

				// Set API URI variable
				const uri = `${credential.data!.url}/${endpoint}`;

				// Generate UUID
				const guid = uuidv4()
					.replace(/-/g,''); // remove the "-"

				// Get unix timestamp in ms
				const timestamp = Date.now();

				// Generate Content MD5
				const contentMd5 = crypto.createHash('md5').update(JSON.stringify(body)).digest('base64');

				// Generate string for signing
				const sigString = method + '\n' +
					'Content-MD5' + contentMd5 + '\n' +
					'X-Ca-Key:' + key + '\n' +
					'X-Ca-Nonce:' + guid + '\n' +
					'X-Ca-Timestamp:' + timestamp + '\n' +
					uri;
				const sign = crypto.createHmac('sha256', secret).update(sigString).digest('base64');

				const options: OptionsWithUri = {
					method,
					headers: {
						'Content-MD5': contentMd5,
						'X-Ca-Key': credential.data!.xCaKey,
						'X-Ca-Timestamp': timestamp,
						'X-Ca-Nonce': guid,
						'X-Ca-Signature': sign,
						'Content-Type': 'application/json',
						'Charset': 'UTF-8',
					},
					body,
					uri,
					json: true,
				};

				try {
					const response = await this.helpers.request(options);

					if (response.status === false) {
						return {
							status: 'Error',
							message: `${response.error}`,
						};
					}
				} catch (err) {
					return {
						status: 'Error',
						message: `${err.message}`,
					};
				}

				return {
					status: 'OK',
					message: 'Connection successful!',
				};
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const simplifyOutput = this.getNodeParameter('simplifyOutput', 0) as boolean;
		let body: IDataObject = {};
		const qs: IDataObject = {};

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'device') {
					if (operation === 'add') {
						body.masc = this.getNodeParameter('macs', i) as string[];
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						Object.assign(body, additionalFields);

						responseData = await yealinkApiRequest.call(this, 'POST', 'api/open/v1/device/add', body);

					} else if (operation === 'checkDevice') {
						qs.mac = this.getNodeParameter('mac', i) as string;

						responseData = await yealinkApiRequest.call(this, 'GET', 'api/open/v1/device/checkDevice', undefined, qs);

					} else if (operation === 'checkMac') {
						qs.mac = this.getNodeParameter('mac', i) as string;

						responseData = await yealinkApiRequest.call(this, 'GET', 'api/open/v1/device/checkMac', undefined, qs);

					} else if (operation === 'delete') {
						qs.ids = this.getNodeParameter('ids', i) as string;

						responseData = await yealinkApiRequest.call(this, 'POST', 'api/open/v1/device/delete', undefined, qs);

					} else if (operation === 'edit') {
						body.ids = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						Object.assign(body, additionalFields);

						responseData = await yealinkApiRequest.call(this, 'POST', 'api/open/v1/device/edit', body);

					} else if (operation === 'list') {
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						Object.assign(body, additionalFields);

						responseData = await yealinkApiRequest.call(this, 'POST', 'api/open/v1/device/list', body);

					} else if (operation === 'migrate') {
						body.ids = this.getNodeParameter('ids', i) as string[];
						body.serverId = this.getNodeParameter('serverId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						Object.assign(body, additionalFields);

						responseData = await yealinkApiRequest.call(this, 'POST', 'api/open/v1/manager/device/migrate', body);

					}

				} else if (resource === 'managerDevice') {
					if (operation === 'edit') {
						body.id = this.getNodeParameter('id', i) as string;
						body.regionId = this.getNodeParameter('regionId', i) as string;
						const staffs = (this.getNodeParameter('staffs', i) as IDataObject).metadataValues as IDataObject;
						if (staffs.lineId !== undefined) {
							body.lineId = staffs.lineId;
						}
						if (body.staffId !== undefined) {
							body.staffId = staffs.staffId;
						}

						responseData = await yealinkApiRequest.call(this, 'POST', 'api/open/v1/manager/device/edit', body);

					}
				} else if (resource === 'region') {
					if (operation === 'add') {
						body.parentId = this.getNodeParameter('parentId', i) as string;
						body.name = this.getNodeParameter('name', i) as string;

						responseData = await yealinkApiRequest.call(this, 'POST', 'api/open/v1/manager/region/add', body);

					} else if (operation === 'list') {
						// todo body
						// const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						// Object.assign(body, additionalFields);

						responseData = await yealinkApiRequest.call(this, 'POST', 'api/open/v1/manager/region/list', body);

					}
				} else if (resource === 'staff') {
					if (operation === 'addSip') {
						// todo check body
						body.sipRegisterName = this.getNodeParameter('sipRegisterName', i) as string;
						body.username = this.getNodeParameter('username', i) as string;
						body.password = this.getNodeParameter('password', i) as string;
						body.sipLabel = this.getNodeParameter('sipLabel', i) as string;
						body.sipDisplayName = this.getNodeParameter('sipDisplayName', i) as string;
						body.sipServer1 = this.getNodeParameter('sipServer1', i) as string;
						body.sipPort1 = this.getNodeParameter('sipPort1', i) as string;
						body.sipServer2 = this.getNodeParameter('sipServer2', i) as string;
						body.sipPort2 = this.getNodeParameter('sipPort2', i) as string;
						body.type = this.getNodeParameter('type', i) as string;
						// const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						// Object.assign(body, additionalFields);

						responseData = await yealinkApiRequest.call(this, 'POST', 'api/open/v1/manager/staff/addSip', body);

					} else if (operation === 'findPagedList') {
						body.searchKey = this.getNodeParameter('searchKey', i) as string;

						responseData = await yealinkApiRequest.call(this, 'POST', 'api/open/v1/manager/staff/findPagedList', body);

					} else if (operation === 'list') {
						// todo body
						// const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						// Object.assign(body, additionalFields);

						responseData = await yealinkApiRequest.call(this, 'POST', 'api/open/v1/manager/staff/list', body);

					}
				}

				if (responseData.error !== null && responseData.error !== undefined) {
					throw new NodeApiError(this.getNode(), {message:responseData.error.msg, description:responseData.error, httpCode:responseData.error.errorCode});
				} else if (simplifyOutput) {
					responseData = simplify(responseData);
				}

				if (Array.isArray(responseData)) {
					returnData.push.apply(returnData, responseData as IDataObject[]);
				} else if (responseData !== undefined) {
					returnData.push(responseData as IDataObject);
				}
			}  catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}