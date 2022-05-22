export interface PostInterface {
  _id: string
  _createdAt: string
  localDate?: string
  title: string
  description: string
  slug: {
    current: string
  }
  author: {
    name: string
    image: string
  }
  mainImage: {
    url: string
  }
  comments: Comment[]
  body: object[]
}

export interface Comment {
  // değerler sanity'den direk alınıyor, hepsi kullanılmayacak.
  _id: string
  _createdAt: string
  _rev: string
  _type: string
  _updatedAt: string
  approved: boolean
  email: string
  message: string
  name: string
  post: {
    _ref: string
    _type: string
  }
}

export interface FormInputs {
  _id: string
  name: string
  email: string
  message: string
}
