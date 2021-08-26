function formatter({ currency, value, maximumFractionDigits }) {
  const numberFormatted = new Intl.NumberFormat('en-US', {
    currency: currency,
    maximumFractionDigits: maximumFractionDigits,
  }).format(value).replaceAll(',', '.')

  return `$ ${numberFormatted}`
}

async function getValueUSDToCOP() {
  const response = await fetch('https://free.currconv.com/api/v7/convert?q=USD_COP&compact=ultra&apiKey=c272efcbc47f0e2f1b27')
  const data = await response.json()
  console.log(data)
  return data.USD_COP
}

async function main() {
  const VALUE_USD_COP = await getValueUSDToCOP()
  const txtUSDToday = document.getElementById("txtUSDToday")
  const btnConvert = document.getElementById("btnConvert")
  const btnConvertIn = document.getElementById("btnConvertIn")

  txtUSDToday.innerText = formatter({
    currency: 'USD',
    value: VALUE_USD_COP
  })

  btnConvert.addEventListener("click", async function(e) {
    e.preventDefault()

    const inputUSD = document.getElementById("inputUSD")
    let txtResult = document.getElementById("txtResult")

    if (inputUSD.value.trim() === "") {
      txtResult.innerText = "Ingresa un valor válido";
      return
    }

    let valueCOP = parseInt(inputUSD.value) * VALUE_USD_COP
    valueCOP = formatter({
      currency: 'COP',
      value: valueCOP,
      maximumFractionDigits: 0
    })

    txtResult.innerText = `${valueCOP} pesos colombianos`
  })

  btnConvertIn.addEventListener('click', function(e) {
    e.preventDefault()
    const inputIn = document.getElementById("inputIn")
    let txtResultIn = document.getElementById("txtResultIn")

    if (inputIn.value.trim() === "") {
      txtResultIn.innerText = "Ingresa un valor válido";
      return
    }

    txtResultIn.innerText = `${parseInt(inputIn.value) * 2.54} cm`
  })
}

main()