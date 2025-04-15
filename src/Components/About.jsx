import articleimgfive from '../Assets/articleimgfive.png'

function About() {
  return (
    <div className="  bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-zinc-900 via-[#0d0d0d] to-zinc-900 px-10 py-8 flex justify-center align-middle  ">
      <div className=" my-12 hover:drop-shadow-custom2 px-16 py-16  w-9/12 backdrop-blur-sm bg-slate-400 rounded-3xl bg-opacity-10 flex justify-evenly ">
        <div className='  text-slate-300 w-4/6'>
          <h2 className=' font-medium font-MavenPro text-3xl '>
            <span className=" hover:cursor-pointer bg-gradient-to-r from-rose-500 to-orange-500 bg-no-repeat bg-bottom bg-[length:100%_6px] hover:bg-[length:100%_100%] transition-[background-size]">
              About Us
            </span>
          </h2>
          <div className=' text-justify my-7 pr-16 '>
            <p>
              Welcome to Purrchase, where we connect animals with loving homes. Our mission is to simplify the adoption process, ensuring a fulfilling experience for pets and adopters alike. We offer a diverse range of pets including dogs, cats, and more, catering to various preferences and lifestyles.
            </p>
            <br/>
            <p>
              Collaborating with shelters and rescue organizations, we prioritize the well-being of each pet, promoting responsible ownership and providing ongoing support. Every adoption creates a special bond, transforming lives and fostering companionship. Join us in making a difference by opening your heart and home to a deserving pet today.
            </p>
            <br/>
            <p>
              Thank you for choosing Purrchase. Together, we can make the world a better place, one adoption at a time.
            </p>
          </div>
        </div>
        <div className='flex justify-center align-middle'>
          <img src={articleimgfive} className='' alt="about image"/>
        </div>
      </div>
        
    </div>
  )
}

export default About
