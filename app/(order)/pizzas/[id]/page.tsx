export default function PizzaPage({ params }: { params: { id: string } }) {
  return (
    <div>pizza {params.id}</div>
  )
}
