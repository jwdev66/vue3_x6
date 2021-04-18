import { Graph } from '@antv/x6'

export const BasicNode = Graph.registerNode('basic-node', {
    inherit: 'rect',
    width: 200,
    height: 40,    
    attrs: {
        body: {
            stroke: '#61DDAA',
            strokeWidth: 1,
            fill: '#61DDAA80',
            rx: 6,
            ry: 6,        
        },
        nodeImage: {
            'xlink:href':
                'https://dl.airtable.com/.attachmentThumbnails/f17c35f9affd107e60b57b5ac91e84aa/03673739',
            width: 26,
            height: 26,
            x: 10,
            y: 7,
        },
        title: {
            text: 'Org Title',
            refX: 45,
            refY: 15,
            fill: '#000000',
            fontSize: 15,
            fontWeight: 'bold',            
            'text-anchor': 'start',
            textWrap: {
                width: 145,
                height: 20,
                ellipsis: true,
            }
        },
        typeImage: {
            'xlink:href':
                'https://dl.airtable.com/.attachmentThumbnails/f17c35f9affd107e60b57b5ac91e84aa/03673739',
            width: 14,
            height: 14,
            x: 130,
            y: 24,
        },
        typeText: {
            text: 'Org',
            refX: 148,
            refY: 32,
            fontSize: 10,
            fill: '#000000',
            'text-anchor': 'start',
        },
    },
    markup: [
        {
            tagName: 'rect',
            selector: 'body',
        },
        {
            tagName: 'image',
            selector: 'nodeImage',
        },
        {
            tagName: 'text',
            selector: 'title',
        },
        {
            tagName: 'image',
            selector: 'typeImage',
        },
        {
            tagName: 'text',
            selector: 'typeText',
        },
    ],
    ports: {
        groups: {
            top: {
                position: 'top',
                attrs: {
                    circle: {
                        r: 5,
                        magnet: 'passive',
                        stroke: '#ffa940',
                        strokeWidth: 1,
                        fill: '#fff',
                        style: {
                            visibility: 'hidden',
                        },
                    },
                },
            },
            bottom: {
                position: 'bottom',
                attrs: {
                    circle: {
                        r: 5,
                        magnet: true,
                        stroke: '#3199FF',
                        strokeWidth: 1,
                        fill: '#fff',
                        style: {
                            visibility: 'hidden',
                        },
                    },
                },
            },            
        },
        items: [
            {
                group: 'top',
            },
            {
                group: 'bottom',
            },
        ],
    },
})


export const OrgNode = Graph.registerNode('org-node', {
    inherit: 'basic-node',    
    attrs: {
        body: {
            stroke: '#61DDAA',
            fill: '#61DDAA80',
        },
        nodeImage: {
            'xlink:href':
                'https://dl.airtable.com/.attachmentThumbnails/f17c35f9affd107e60b57b5ac91e84aa/03673739',
        },
        title: {
            text: 'Org Title',
        },
        typeImage: {
            'xlink:href':
                'https://dl.airtable.com/.attachmentThumbnails/f17c35f9affd107e60b57b5ac91e84aa/03673739',
        },
        typeText: {
            text: 'Org',
        },
    },
})

export const ProjectNode = Graph.registerNode('project-node', {
    inherit: 'basic-node',
    attrs: {
        body: {
            stroke: '#5F95FF',
            fill: '#5F95FF80',
        },
        nodeImage: {
            'xlink:href':
                'https://api.iconify.design/mdi-crane.svg',
        },
        title: {
            text: 'Project Title',
        },
        typeImage: {
            'xlink:href':
                'https://api.iconify.design/mdi-crane.svg',
        },
        typeText: {
            text: 'Project',
        },
    },
})


export const FunctionNode = Graph.registerNode('function-node', {
    inherit: 'project-node',
    attrs: {
        body: {
            stroke: '#F6BD16',
            fill: '#F6BD1680',
        },
        nodeImage: {
            'xlink:href':
                'https://api.iconify.design/mdi-function.svg',
        },
        title: {
            text: 'Function Title',
        },
        typeImage: {
            'xlink:href':
                'https://api.iconify.design/mdi-function.svg',
        },
        typeText: {
            text: 'Function',
        },
    },
})

export const DeviceNode = Graph.registerNode('device-node', {
    inherit: 'basic-node',
    attrs: {
        body: {
            stroke: '#9661BC',
            fill: '#9661BC80',
        },
        nodeImage: {
            'xlink:href':
                'https://api.iconify.design/mdi-chip.svg',
        },
        title: {
            text: 'Device Title',
        },
        typeImage: {
            'xlink:href':
                'https://api.iconify.design/mdi-chip.svg',
        },
        typeText: {
            text: 'Device',
        },
    },
})

export const ResourceNode = Graph.registerNode('resource-node', {
    inherit: 'basic-node',
    attrs: {
        body: {
            stroke: '#D37099',
            fill: '#D3709980',
        },
        nodeImage: {
            'xlink:href':
                'https://api.iconify.design/emojione-monotone:letter-r.svg',
        },
        title: {
            text: 'Resource Title',
        },
        typeImage: {
            'xlink:href':
                'https://api.iconify.design/emojione-monotone:letter-r.svg',
        },
        typeText: {
            text: 'Resource',
        },
    },
})

export const PeopleNode = Graph.registerNode('people-node', {
    inherit: 'basic-node',
    attrs: {
        body: {
            stroke: '#87412B',
            fill: '#87412B80',
        },
        nodeImage: {
            'xlink:href':
                'https://api.iconify.design/akar-icons:person.svg',
        },
        title: {
            text: 'People Title',
        },
        typeImage: {
            'xlink:href':
                'https://api.iconify.design/akar-icons:person.svg',
        },
        typeText: {
            text: 'People',
        },
    },
})