import {
	INodeProperties,
} from 'n8n-workflow';

export const alarmOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['alarm'],
			},
		},
		options: [
			{
				name: 'Get Alarms',
				value: 'getAlarms',
			},
			{
				name: 'Get List',
				value: 'getList',
			},
		],
		default: 'getList',
	},
];

export const alarmFields: INodeProperties[] = [

	/*-------------------------------------------------------------------------- */
	/*                          		alarm:getAlarms                    		 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['alarm'],
				operation: ['getAlarms'],
			},
		},
		options: [
			{
				displayName: 'Alarm IDs',
				name: 'alarmIds',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Add Alarm ID',
				default: {},
				description: '',
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: '',
					},
				],
			},
			{
				displayName: 'Auto Count',
				name: 'autoCount',
				type: 'boolean',
				default: false,
				description: '',
			},
			
			{
				displayName: 'Enterprise ID',
				name: 'enterpriseId',
				type: 'boolean',
				default: '',
				description: 'Example: 2680cc3128bb4eab92c57bb1f54432c3',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				description: '',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 0,
				description: '',
			},
			{
				displayName: 'Mac Search Key',
				name: 'macSearchKey',
				type: 'string',
				default: '',
				description: '',
			},
			{
				displayName: 'Module',
				name: 'module',
				type: 'string',
				default: '',
				description: '',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: '',
			},
			{
				displayName: 'Orderbys',
				name: 'orderbys',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: '',
				options: [
					{
						name: 'metadataValues',
						displayName: 'Metadata',
						values: [
							{
								displayName: 'Field',
								name: 'field',
								type: 'string',
								default: '',
								description: '',
							},
							{
								displayName: 'Order',
								name: 'order',
								type: 'number',
								default: '',
								description: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Region IDs',
				name: 'regionIds',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Add Region ID',
				default: {},
				description: '',
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: '',
					},
				],
			},
			{
				displayName: 'Search Key',
				name: 'searchKey',
				type: 'string',
				default: '',
				description: '',
			},
			
			{
				displayName: 'Severities',
				name: 'severities',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Add Severity',
				default: {},
				description: '',
				options: [
					{
						displayName: 'Level',
						name: 'level',
						type: 'string',
						default: '',
						description: '',
					},
				],
			},
			{
				displayName: 'Severity',
				name: 'severity',
				type: 'string',
				default: '',
				description: '',
			},
			{
				displayName: 'Skip',
				name: 'skip',
				type: 'number',
				default: 0,
				description: '',
			},
			{
				displayName: 'Total',
				name: 'total',
				type: 'number',
				default: 0,
				description: '',
			},
		],
	},

	/*-------------------------------------------------------------------------- */
	/*                          	alarm:getList                     		 	 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['alarm'],
				operation: ['getList'],
			},
		},
		options: [
			{
				displayName: 'Search Key',
				name: 'searchKey',
				type: 'string',
				default: '',
				description: 'The keywords (MAC, IP address, the device name, orthe enterprise name) used for searching',
			},
			{
				displayName: 'Auto Count',
				name: 'autoCount',
				type: 'boolean',
				default: false,
				description: 'Count the amount of alarm automatically or not. Itdefaults to false.',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 1000,
				description: 'The maximum number of obtained alarm. It defaults to 1000.',
			},
			{
				displayName: 'Module',
				name: 'module',
				type: 'string',
				default: '',
				description: 'The module that the alarm belongs to',
			},
			{
				displayName: 'Orderbys',
				name: 'orderbys',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: '',
				options: [
					{
						name: 'metadataValues',
						displayName: 'Metadata',
						values: [
							{
								displayName: 'Field',
								name: 'field',
								type: 'string',
								default: '',
								description: '',
							},
							{
								displayName: 'Order',
								name: 'order',
								type: 'number',
								default: '',
								description: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Region IDs',
				name: 'regionIds',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Add Region ID',
				default: {},
				description: '',
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: '',
					},
				],
			},
			{
				displayName: 'Severities',
				name: 'severities',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Add Severity',
				default: {},
				description: '',
				options: [
					{
						displayName: 'Level',
						name: 'level',
						type: 'string',
						default: '',
						description: '',
					},
				],
			},
			{
				displayName: 'Severity',
				name: 'severity',
				type: 'string',
				default: '',
				description: '',
			},
			{
				displayName: 'Skip',
				name: 'skip',
				type: 'number',
				default: 0,
				description: 'The number of skipped records. It defaults to 0.',
			},
		],
	},

];