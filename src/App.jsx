

import { useEffect, useState } from "react"
import Prayar from "./component/prayar"

function App() {

  const [PrayarTimes , setPrayarTimes] = useState({})
  const [DateTimes , setDateTimes] = useState('')
  const [City , setCity] = useState('cairo')

  const cities = [
    {name:"القاهره" , value:"cairo"},
    {name:"الاسكندريه" , value:"Alexandria"},
    {name:"المنصوره" , value:"elmansoura"},
    {name:"الجيزه" , value:"giza"},
    {name:"اسوان" , value:"Aswan"},
  ]

  
  console.log(City);
  




  useEffect(()=>{
    const fetchPrayarTimes = async()=>{
      try{

        const response =await fetch(`https://api.aladhan.com/v1/timingsByCity/16-09-2024?city=Eg&country=${City}`)
        const data_prayar = await response.json()

        setPrayarTimes(data_prayar.data.timings)
        setDateTimes(data_prayar.data.date.gregorian.date)

        console.log(data_prayar.data.date.gregorian.date);
        

      } catch(error){
        console.error(error)
      }
    }

    fetchPrayarTimes()
  }, [City])



  const formatTimes = (time)=>{
    if(!time){
      return "00:00"
    }

    let [hours ,minutes] = time.split (":").map(Number)
    const perd = hours >= 12 ? "PM" : "AM"  ;
    hours = hours % 12 || 12 ;
    return `${hours} : ${minutes < 10 ? "0" + minutes : minutes} ${perd}`
  }

  
 

  return (
    <>
     <section>
      <div className="container">
        <div className="top_sec">
          <div className="city">

            <h3> المدينه</h3>

            <select name="" id=""  onChange={(e)=> setCity(e.target.value)}>

              {cities.map((city_obj) =>(

                <option key={city_obj.value} value={city_obj.value}>{city_obj.name}</option>

              ))}
            </select>



          </div>              {/*city */}


          <div className="date">
          
          <h3>التاريخ</h3>
          <h4> {DateTimes}</h4>

          </div>


        </div>            {/* top_sec */}

        <Prayar name = 'الفجر'   time ={formatTimes(PrayarTimes.Fajr)} />
        <Prayar name = 'الظهر'   time ={formatTimes(PrayarTimes.Dhuhr)} />
        <Prayar name = 'العصر'   time ={formatTimes(PrayarTimes.Asr)} />
        <Prayar name = 'المغرب'   time ={formatTimes(PrayarTimes.Maghrib)} />
        <Prayar name = 'العشاء'   time ={formatTimes(PrayarTimes.Isha)} />
        
      </div>         {/* container */}
     </section>
    </>
  )
}

export default App









////////////////////////////////////// test/////

// const cites =[
//   {name:'القاهره' , value:'cairo'},
//   {name:'القاهره' , value:'cairo'},
//   {name:'القاهره' , value:'cairo'},
//   {name:'القاهره' , value:'cairo'},
//   {name:'القاهره' ,value:'cairo'},
// ]



// const[PrayarTimes , setPrayarTimes]= useState({})
// const[prayarDateTimes , setDateTimes] = useState('')




// useEffect(()=>{
//   const fetchPrayarTimes =  async ()=>{
//     try{
//       const response = await fetch('')
//       const data_prayar = await response.json()

//       setPrayarTimes(data_prayar.data.timings)
//       setDateTimes(data_prayar.)

      
//       console.log(data_prayar)
//     } catch{
//       console.error(error)
//     }

//   }
// }
 
// )




// return(






//   <select>
//     {
//       cites.map((prayer_obj)=>(
//         <option key={prayer_obj.value}   value={prayer_obj.value}>{prayer_obj.name}</option>
//       ))
//     }
//   </select>
// )
