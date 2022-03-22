import {
	INodeProperties,
} from 'n8n-workflow';

export const managerDeviceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['managerDevice'],
			},
		},
		options: [
			{
				name: 'Edit',
				value: 'edit',
			},
		],
		default: 'edit',
	},
];

export const managerDeviceFields: INodeProperties[] = [
	/*-------------------------------------------------------------------------- */
	/*                            managerDevice:edit                             */
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
				resource: ['managerDevice'],
				operation: ['edit'],
			},
		},
		default: '',
		description: 'The device ID',
	},
	{
		displayName: 'Region ID',
		name: 'regionId',
		required: true,
		type: 'string',
		// type: 'options',
		// typeOptions: {
		// 	loadOptionsMethod: 'getRegionIds', // todo
		// },
		displayOptions: {
			show: {
				resource: ['managerDevice'],
				operation: ['edit'],
			},
		},
		default: '',
		description: 'The Region ID',
	},
	{
		displayName: 'Staffs',
		name: 'staffs',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Staff',
		default: { metadataValues: [{lineId:'', staffId: ''}] },
		displayOptions: {
			show: {
				resource: ['managerDevice'],
				operation: ['edit'],
			},
		},
		options: [
			{
				name: 'metadataValues',
				displayName: 'Metadata',
				values: [
					{
						displayName: 'Line ID',
						name: 'lineId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Staff ID',
						name: 'staffId',
						type: 'string',
						default: '',
						description: '',
					},
				],
			},
		],
	},
];