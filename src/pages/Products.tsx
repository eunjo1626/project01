import { useEffect,useState } from "react"
import axios from "axios"
import { useCart } from "./CartContext" // 제일 중요함!! 전역변수!!
import type { Product } from "../types/products"
import styles from './Products.module.scss'


const Products:React.FC = () => {
  const [list,setList] = useState<Product[]>([])
  const [error,setError] = useState<string | null>(null)
  const {cart,add,inc,dec} = useCart() // 사용방법

  useEffect(()=>{
    const load = async ()=>{
      try{
        const {data} = await axios.get<Product[]>('/products.json')
        // const res = await axios.get(); setList(res.data)
        setList(data)
      }catch(err){
        setError('상품목록을 불러오지 못했습니다')
        console.error(err);        
      }
    }
    load()
  },[])

  // 공유 키값에서 수량 들고오기
  const getQty = (id:number)=>{
    const found = cart.find(kk => kk.product.id ===id)
    return Math.max(found?found.qty:0,0)
  }

  if(error) return <div style={{color:'red', padding:20}}>{error}</div>



  
  return (
    <div className={styles.products}>
      <h1 style={{textAlign:"center"}}>상품소개</h1>
      <div className={styles.gridBox}>
        {
          list.map(item=>{
            const qty = getQty(item.id)
            return(
              <article key={item.id} className={styles.card}>
                <img src={item.image} alt={item.title} className={styles.imgs}
                style={{width:'300px', height:'300px', objectFit:'cover'}}/>
                <div className={styles.info}>
                  <h3>{item.title}</h3>
                  <h5>{item.desc}</h5>
                  <p>{item.price.toLocaleString()}원</p>
                </div>

                <div className={styles.btns}>
                  {
                      qty ===0 ?(
                        // 담기버튼
                        <button onClick={()=>add(item,1)} className={styles.addBtn}>담기(상품선택)</button>
                      )
                      : (
                      // +,-버튼, 수량을 나타내는 태그
                      <div className={styles.btnOutbox}>
                        <button onClick={()=>dec(item.id)} aria-label={`${item.title} 수량 감소 빼기`}>-</button>
                        <span>{qty}</span>
                        <button onClick={()=>inc(item.id)} aria-label={`${item.title} 수량 증가 더하기`}>+</button>
                      </div>
                      )// 삼항 연산자 end 
                  }   {/* 구현 end */}
                </div>

              </article>
            )
          }) // map end
        }

      </div>
    </div>
  )
}

export default Products