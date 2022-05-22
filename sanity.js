// https://www.sanity.io/docs/connect-your-content-to-next-js
// https://www.sanity.io/docs/reference
import { createClient, createCurrentUserHook } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const config = {
  // dataset ve projectId'yi sanityStudio'nun(bu projede medium-clone klasörü) içindeki sanity.json'dan öğrenebiliyoruz.
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production', //NEXT_PUBLIC_'le başlayan env'ler nodejs'nin içi dışında browser'da da tanımlı oluyor.
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  // apiVersion en güncel halinin kullanılması için genelllikle o günün tarihi oluyor.
  apiVersion: 1,
  token: process.env.SANITY_API_TOKEN,
  // cdn(Content Delivery Network) request'in yapıldığı yer nereye yakınsa oradaki server'dan internet sitesinin verilmesi olayına deniliyor(böylelikle daha hızlı bir veri iletimi sağlanıyor.)
  useCdn: process.env.NODE_ENV === 'production',
}

export const sanityClient = createClient(config)

const builder = imageUrlBuilder(sanityClient)

// query'den dönen image record'larını istediğimiz boyutlarda resim url'sine dönüştüren fonksiyon,
// örnek: <img src={urlFor(author.image).width(200).height(200).blur(50).url()} /> -> belirtilen boyutlarda blurlu image cdn'i veriyor, url() her zaman sonda olmak zorunda.
// https://www.sanity.io/docs/image-url
export const urlFor = (source) => {
  return builder.image(source)
}

// Şu anda giriş yapmış olan kullanıcının id, email adres gibi bilgilerini kullanmamızı sağlayan bir yardımcı fonksiyon.
// https://www.sanity.io/schemas/usecurrentuser-custom-react-hook-976529a6
export const useCurrentUser = createCurrentUserHook(config)
