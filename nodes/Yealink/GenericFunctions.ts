import {
	OptionsWithUri,
} from 'request';

import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	NodeApiError,
	NodeOperationError,
} from 'n8n-workflow';

import * as crypto from 'crypto';

import * as CryptoJS from 'crypto-js';

import { v4 as uuidv4 } from 'uuid';

export async function yealinkApiRequest(this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	method: string, endpoint: string, body: IDataObject = {}, qs: IDataObject = {}, uri?: string): Promise<any> { // tslint:disable-line:no-any

	// Make http request according to "Yealink Json API for RPS Management Platform Version 3.6.0.30 I January 2021"
	// Useful blogs:
	// https://automationadmin.com/2019/10/yealink-rest-api
	// https://automationadmin.com/2020/02/learning-rest-api-examples

	try {
		// Get credentials the user provided for this node
		const credentials = await this.getCredentials('yealinkApi') as IDataObject;
		if (credentials === undefined) {
			throw new NodeOperationError(this.getNode(), 'No credentials got returned!');
		}

		// Get key/secret
		const key = credentials.xCaKey as string;
		const secret = credentials.secret as string;

		// Set API URI variable
		uri = uri || `${credentials.url}/${endpoint}`;

		// Generate UUID
		const guid = uuidv4()
			.replace(/-/g,''); // remove the "-"

		// Get unix timestamp in ms
		const timestamp = Date.now();

		let options: OptionsWithUri;
		// When the Body is null (the content-Length is 0), the Content-MD5 is not required in the header
		if (Object.keys(body).length === 0) {

			// Generate string for signing
			let sigString = method + '\n' +
				'X-Ca-Key:' + key + '\n' +
				'X-Ca-Nonce:' + guid + '\n' +
				'X-Ca-Timestamp:' + timestamp + '\n' + '\n' +
				endpoint;

			// Add query string parameters to the sigString if they exist
			if (Object.keys(qs).length !== 0) {
				let formattedQFStr = '';
				for (const [key, value] of Object.entries(qs)) {
					formattedQFStr += `${key}=${value}`;
				}
				sigString += '\n' + formattedQFStr;
			}

			// Create the signature
			// const sign = crypto.createHmac('sha256', secret).update(sigString).digest('base64');
			//  const sign = crypto.createHmac('sha256', secret).update(sigString, 'utf-8').digest('base64');
			const sign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(sigString, secret));

			options= {
				method,
				headers: {
					'X-Ca-Key': credentials.xCaKey,
					'X-Ca-Timestamp': timestamp,
					'X-Ca-Nonce': guid,
					'X-Ca-Signature': sign,
					'Content-Type': 'application/json',
					'Charset': 'UTF-8',
				},
				qs,
				uri,
				json: true,
			};

			if (Object.keys(options.qs).length === 0) {
				delete options.qs;
			}

		} else {

			// Generate Content MD5
			const contentMd5 = crypto.createHash('md5').update(JSON.stringify(body)).digest('base64');

			// Generate string for signing
			const sigString = method + '\n' +
				'Content-MD5' + contentMd5 + '\n' +
				'X-Ca-Key:' + key + '\n' +
				'X-Ca-Nonce:' + guid + '\n' +
				'X-Ca-Timestamp:' + timestamp + '\n' + '\n' +
				endpoint;

			// Create the signature
			// const sign = crypto.createHmac('sha256', secret).update(sigString).digest('base64');
			//  const sign = crypto.createHmac('sha256', secret).update(sigString, 'utf-8').digest('base64');
			const sign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(sigString, secret));

			options= {
				method,
				headers: {
					'Content-MD5': contentMd5,
					'X-Ca-Key': credentials.xCaKey,
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
		}

		return this.helpers.request!(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

/**
 * Simplifies the output
 *
 * @export
 * @param IDataObject responseData
 * @returns IDataObject
 */
export function simplify(responseData: IDataObject, property = 'data'): IDataObject {
	if (typeof responseData[property] === 'string') {
		// if the property is string return just it and skip other properties
		return {[property]: responseData[property]};
	} else if (Object.keys(responseData[property] as IDataObject).length !== 0) {
		// if the property is not empty return the object inside it
		return responseData[property] as IDataObject;
	} else {
		// otherwise return the same data
		return responseData;
	}
}