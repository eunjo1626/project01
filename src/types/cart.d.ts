// .d.ts :: 컴파일 할 때 파일 생성 안함 but 사용 가능
// 타입스크립트 :: js안전성 ==> 컴파일 단계에서 에러표시가 많이 남
// let name:string = "홍길동"
// let name = "홍길동" :: 타입추론(자동인식)
// 객체 이름을 먼저 만들고 사용해야함

import type { Product } from "./products"
// 🛒 장바구니의 단일 항목
export interface CartItem {
  product: Product
  qty: number
}

// 🧺 장바구니 전체 배열
export type Cart = CartItem[]

// import type [Cart,cartItem] from '../type/cart'
// let [item,setItem] = useState<Cart>([])
// .then((data:Cart)=> setItem(data))
