exports.models = {

  Item: {
    id: 'Item',
    required: ['content', 'title'],
    properties: {
   
      title: {
        type: 'string',
        description: 'Title of the item'
      },
      content: {
        type: 'string',
        description: 'content of the item'
      },
      permissions: {
        type: 'Array',
        description: 'Permissions for viewing the item'
      }
    }
  }
};
