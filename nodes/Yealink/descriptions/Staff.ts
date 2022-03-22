import {
	INodeProperties,
} from 'n8n-workflow';

export const staffOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['staff'],
			},
		},
		options: [
			{
				name: 'Add Sip',
				value: 'addSip',
			},
			{
				name: 'Find Paged List',
				value: 'findPagedList',
			},
			{
				name: 'List',
				value: 'list',
			},
		],
		default: 'list',
	},
];

export const staffFields: INodeProperties[] = [

	/*-------------------------------------------------------------------------- */
	/*                          	staff:addSip                     		 	 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'SIP Register Name',
		name: 'sipRegisterName',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['addSip'],
			},
		},
		default: '',
		description: '',
	},
	{
		displayName: 'Username',
		name: 'username',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['addSip'],
			},
		},
		default: '',
		description: '',
	},
	{
		displayName: 'Password',
		name: 'password',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['addSip'],
			},
		},
		default: '',
		description: '',
	},
	{
		displayName: 'SIP Label',
		name: 'sipLabel',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['addSip'],
			},
		},
		default: '',
		description: '',
	},
	{
		displayName: 'SIP Display Name',
		name: 'sipDisplayName',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['addSip'],
			},
		},
		default: '',
		description: '',
	},
	{
		displayName: 'SIP Server1',
		name: 'sipServer1',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['addSip'],
			},
		},
		default: '',
		description: '',
	},
	{
		displayName: 'SIP Port 1',
		name: 'sipPort1',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['addSip'],
			},
		},
		default: '',
		description: '',
	},
	{
		displayName: 'SIP Server2',
		name: 'sipServer2',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['addSip'],
			},
		},
		default: '',
		description: '',
	},
	{
		displayName: 'SIP Port 2',
		name: 'sipPort2',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['addSip'],
			},
		},
		default: '',
		description: '',
	},
	{
		displayName: 'Type',
		name: 'type',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['addSip'],
			},
		},
		default: '',
		description: '',
	},
	// todo additional fields

	/*-------------------------------------------------------------------------- */
	/*                          	staff:findPagedList                    		 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Search Key',
		name: 'searchKey',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['staff'],
				operation: ['findPagedList'],
			},
		},
		default: '',
		description: 'The search key',
	},

	/*-------------------------------------------------------------------------- */
	/*                          	staff:list                     		 		 */
	/* ------------------------------------------------------------------------- */
	// {
	// 	displayName: 'Additional Fields',
	// 	name: 'additionalFields',
	// 	type: 'collection',
	// 	placeholder: 'Add Field',
	// 	default: {},
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['staff'],
	// 			operation: ['list'],
	// 		},
	// 	},
	// 	options: [
	// 		{
	// 			displayName: 'Key',
	// 			name: 'key',
	// 			type: 'string',
	// 			default: '',
	// 			description: 'The key words',
	// 		},
	// 		{
	// 			displayName: 'Status',
	// 			name: 'status',
	// 			type: 'string',
	// 			default: '',
	// 			description: 'The status mark, one of bound or unbound',
	// 		},
	// 		{
	// 			displayName: 'Skip',
	// 			name: 'skip',
	// 			type: 'string',
	// 			default: '',
	// 			description: 'The skipped records, and it defaults to 0',
	// 		},
	// 		{
	// 			displayName: 'Limit',
	// 			name: 'limit',
	// 			type: 'number',
	// 			default: 0,
	// 			description: 'The maximum number of the obtained records per paging',
	// 		},
	// 		{
	// 			displayName: 'Auto Count',
	// 			name: 'autoCount',
	// 			type: 'boolean',
	// 			default: false,
	// 			description: 'Whether the total number is accounted automatically. It defaults to false.',
	// 		},
	// 	],
	// },

];