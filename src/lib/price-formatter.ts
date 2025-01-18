export default function PriceFormatter(value: number) {

  const total = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    .format(value)

  return total
}
