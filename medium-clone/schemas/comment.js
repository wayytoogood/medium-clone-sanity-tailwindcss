export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    // comment'in bizim tarafızdan onaylanıp onaylanmadığını belirten field.
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: "Comments won't show on the site without approval",
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Message',
      type: 'string',
    },
    {
      name: 'post',
      title: 'Related Post',
      type: 'reference',
      to: { type: 'post' },
    },
  ],
}
