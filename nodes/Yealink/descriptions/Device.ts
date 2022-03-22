import {
	INodeProperties,
} from 'n8n-workflow';

export const deviceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['device'],
			},
		},
		options: [
			{
				name: 'Add',
				value: 'add',
				description: 'Adding a batch of devices',
			},
			{
				name: 'Check Device',
				value: 'checkDevice',
				description: 'Detecting whether or not the device is registered',
			},
			{
				name: 'Check Mac',
				value: 'checkMac',
				description: 'Detecting whether or not the device exists',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Deleting a batch of devices',
			},
			{
				name: 'Edit',
				value: 'edit',
				description: 'Editing the device',
			},
			{
				name: 'List',
				value: 'list',
				description: 'Viewing the device information by paging',
			},
			{
				name: 'Migrate',
				value: 'migrate',
				description: 'Migrating a batch of devices',
			},
		],
		default: 'list',
	},
];

export const deviceFields: INodeProperties[] = [
	/*-------------------------------------------------------------------------- */
	/*                                device:add                            	 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Macs',
		name: 'macs',
		required: true,
		type: 'multiOptions',
		typeOptions: {
			loadOptionsMethod: 'getDeviceMacs',
		},
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['add'],
			},
		},
		default: '',
		description: 'The list of the MAC addresses',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['add'],
			},
		},
		options: [
			{
				displayName: 'Server ID',
				name: 'serverId',
				type: 'string',
				default: '',
				description: 'The server ID',
			},
			{
				displayName: 'Unique Server Url',
				name: 'uniqueServerUrl',
				type: 'string',
				default: '',
				description: 'The URL of the autop server, and it is set for certain devices. After you set a URL for this parameter, the phone will go to the URL firstly when sending the RPS request. If you do notset a URL, the phone will go to the linked serverURL.',
			},
			{
				displayName: 'Remark',
				name: 'remark',
				type: 'string',
				default: '',
				description: 'The remark',
			},
			{
				displayName: 'Auth Name',
				name: 'authName',
				type: 'string',
				default: '',
				description: 'The authentication name',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				default: '',
				description: 'The authentication password',
			},
		],
	},

	/*-------------------------------------------------------------------------- */
	/*                                device:checkDevice                         */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Mac',
		name: 'mac',
		required: true,
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getDeviceMacs',
		},
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['checkDevice'],
			},
		},
		default: '',
		description: 'The MAC address',
	},

	/*-------------------------------------------------------------------------- */
	/*                                device:checkMac                            */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Mac',
		name: 'mac',
		required: true,
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getDeviceMacs',
		},
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['checkMac'],
			},
		},
		default: '',
		description: 'The MAC address',
	},

	/*-------------------------------------------------------------------------- */
	/*                                device:delete                            	 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'IDs',
		name: 'ids',
		required: true,
		type: 'multiOptions',
		typeOptions: {
			loadOptionsMethod: 'getDeviceIds',
		},
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'The list of the device IDs',
	},

	/*-------------------------------------------------------------------------- */
	/*                                device:edit                            	 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'ID',
		name: 'id',
		required: true,
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getDeviceIds',
		},
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['edit'],
			},
		},
		default: '',
		description: 'The device ID',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['edit'],
			},
		},
		options: [
			{
				displayName: 'Server ID',
				name: 'serverId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getServerIds',
				},
				default: '',
				description: 'The server ID',
			},
			{
				displayName: 'Unique Server URL',
				name: 'uniqueServerUrl',
				type: 'string',
				default: '',
				description: 'The URL of the autop server, set for certain devices, has a higher priority than the linked server URL.',
			},
			{
				displayName: 'Remark',
				name: 'remark',
				type: 'string',
				default: '',
				description: 'The remark',
			},
			{
				displayName: 'Auth Name',
				name: 'authName',
				type: 'string',
				default: '',
				description: 'The authentication name',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				default: '',
				description: 'The authentication password',
			},
		],
	},

	/*-------------------------------------------------------------------------- */
	/*                                device:list                            	 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Key',
				name: 'key',
				type: 'string',
				default: '',
				description: 'The key words',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				description: 'The status mark, one of bound or unbound',
			},
			{
				displayName: 'Skip',
				name: 'skip',
				type: 'string',
				default: '',
				description: 'The skipped records, and it defaults to 0',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 0,
				description: 'The maximum number of the obtained records per paging',
			},
			{
				displayName: 'Auto Count',
				name: 'autoCount',
				type: 'boolean',
				default: false,
				description: 'Whether the total number is accounted automatically. It defaults to false.',
			},
		],
	},

	/*-------------------------------------------------------------------------- */
	/*                                device:migrate                             */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'IDs',
		name: 'ids',
		required: true,
		type: 'multiOptions',
		typeOptions: {
			loadOptionsMethod: 'getDeviceIds',
		},
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['migrate'],
			},
		},
		default: '',
		description: 'The list of the device IDs',
	},
	{
		displayName: 'Server ID',
		name: 'serverId',
		required: true,
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getServerIds',
		},
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['migrate'],
			},
		},
		default: '',
		description: 'The server ID',
	},

];