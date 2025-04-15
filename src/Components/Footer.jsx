import phone from '../Assets/phone.png'
import mail from '../Assets/mail.png'
import address from '../Assets/address.png'
import google from '../Assets/google.png'
import facebook from '../Assets/facebook.png'
import twitter from '../Assets/twitter.png'
import instagram from '../Assets/instagram.png'
import telegram from '../Assets/telegram.png'

function Footer() {
  return (
    <div id='#contact' className=' bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-zinc-950 via-[#0d0d0d] to-zinc-950'>
      <div className=' pt-10 pb-10 flex justify-evenly py-4 text-white'>
        <div className=' mr-6 w-1/4 '>
          <h1 className=" w-4/5 text-3xl font-Belanosima font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">Purr-chase</h1>
          <br/>
          <p className=' text-justify text-slate-400 '>
            Be among the first to know about new pets, special offers and much more!
          </p>
          <br/>
          <br/>
        </div>
        <div className=' w-40'>
          <h3 className=' text-lg text-orange-600 font-MavenPro font-semibold hover:cursor-pointer hover:text-orange-300 '>Purr-chase</h3>
          <ul className=' p-2 '>
            <li className=' text-slate-400 font-Quicksand p-1 hover:cursor-pointer hover:text-slate-200 '>Home</li>
            <li className=' text-slate-400 font-Quicksand p-1 hover:cursor-pointer hover:text-slate-200 '>Find</li>
            <li className=' text-slate-400 font-Quicksand p-1 hover:cursor-pointer hover:text-slate-200 '>About</li>
            <li className=' text-slate-400 font-Quicksand p-1 hover:cursor-pointer hover:text-slate-200 '>Contact</li>
          </ul>
        </div>
        <div className=' w-40'>
          <h3 className=' text-lg text-orange-600 font-MavenPro font-semibold hover:cursor-pointer hover:text-orange-300 '>Account</h3>
          <ul className=' p-2 '>
            <li className=' text-slate-400 font-Quicksand p-1 hover:cursor-pointer hover:text-slate-200 '>Profile</li>
            <li className=' text-slate-400 font-Quicksand p-1 hover:cursor-pointer hover:text-slate-200 '>My pets</li>
            <li className=' text-slate-400 font-Quicksand p-1 hover:cursor-pointer hover:text-slate-200 '>My History</li>
            <li className=' text-slate-400 font-Quicksand p-1 hover:cursor-pointer hover:text-slate-200 '>My Account</li>
          </ul>
        </div>
        
        <div className=' mr-6 w-50 '>
          <h3 className=' text-lg text-orange-600 font-MavenPro font-semibold hover:cursor-pointer hover:text-orange-300 '>Contact</h3>
          <ul className=' p-2 '>
            <li className=' flex text-slate-400 font-Quicksand p-1 hover:cursor-pointer hover:text-slate-200 '>
              <img className="w-6 h-6 mr-2" src={phone} alt="phone"/>
              123-456-7890
            </li>
            <li className=' flex text-slate-400 font-Quicksand p-1 hover:cursor-pointer hover:text-slate-200 '>
              <img className="w-6 h-6 mr-2" src={address} alt="address"/>
              12 Street, City,<br/>
              State 12345

            </li>
            <li className=' flex text-slate-400 font-Quicksand p-1 hover:cursor-pointer hover:text-slate-200 '>
              <img className="w-6 h-auto mr-2" src={mail} alt="mail"/>
              email@email.com
            </li>
          </ul>
        </div>
      </div>
      <div className='ml-8 mr-8 '>
        <div className=' w-full h-[2px] bg-gradient-to-r from-transpaernt via-neutral-500 to-transparent '/>
      </div>
      <div className=' p-10 text-slate-400' >
        <div className=' flex justify-center items-center ml-8 mr-8'>
          <div className=' border-2 p-2 rounded-3xl hover:bg-slate-800 mx-2 hover:cursor-pointer '>
            <img className="w-6 h-6" src={google} alt="google"/>
          </div>
          <div className=' border-2 p-2 rounded-3xl hover:bg-slate-800 mx-2 hover:cursor-pointer '>
            <img className="w-6 h-6" src={instagram} alt="instagram"/>
          </div>
          <div className=' border-2 p-2 rounded-3xl hover:bg-slate-800 mx-2 hover:cursor-pointer '>
            <img className="w-6 h-6" src={telegram} alt="telegram"/>
          </div>
          <div className=' border-2 p-2 rounded-3xl hover:bg-slate-800 mx-2 hover:cursor-pointer '>
            <img className="w-6 h-6" src={facebook} alt="facebook"/>
          </div>
          <div className=' border-2 p-2 rounded-3xl hover:bg-slate-800 mx-2 hover:cursor-pointer '>
            <img className="w-6 h-6" src={twitter} alt="twitter"/>
          </div>
        </div>  
        <div className=' flex justify-center items-center mt-8'>
          <p>
            © 2021 Purr-chase. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
