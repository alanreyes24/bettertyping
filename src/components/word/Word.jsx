

const words = ["miles", "reyes", "drip", "swag", "end"]


function Word() {

    const word = words[Math.floor(Math.random() * 5)].split("");

    let test = word.map((item) => <div className='letter' key={item}>{item}</div>)


    return (

        test

    )
}



export default Word