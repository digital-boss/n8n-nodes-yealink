import {
	INodeProperties,
} from 'n8n-workflow';

export const regionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['region'],
			},
		},
		options: [
			{
				name: 'Add',
				value: 'add',
			},
			{
				name: 'List',
				value: 'list',
			},
		],
		default: 'list',
	},
];

export const regionFields: INodeProperties[] = [

	/*-------------------------------------------------------------------------- */
	/*                          	 region:add	 	                    	 	 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Parent ID',
		name: 'parentId',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['region'],
				operation: ['add'],
			},
		},
		default: '',
		description: '',
	},
	{
		displayName: 'Name',
		name: 'name',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['region'],
				operation: ['add'],
			},
		},
		default: '',
		description: '',
	},

	/*-------------------------------------------------------------------------- */
	/*                 				 region:list			        			 */
	/* ------------------------------------------------------------------------- */

	// {
	// 	displayName: 'Additional Fields',
	// 	name: 'additionalFields',
	// 	type: 'collection',
	// 	placeholder: 'Add Field',
	// 	default: {},
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['region'],
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