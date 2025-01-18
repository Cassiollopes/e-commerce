import Footer from "@/components/footer"
import NavBar from "@/components/nav/nav-bar"
import ScrollNav from "@/components/nav/scroll-nav"


export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ScrollNav />
      <NavBar />
      {children}
      <div className="px-4 mt-8">
        <Footer />
      </div>
    </>
  )
}