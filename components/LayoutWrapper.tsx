import { ReactNode } from "react"

type WrapperProps = {
    children: ReactNode
}

const LayoutWrapper = ({ children }: WrapperProps) => {
    return (
        <main className="px-5 lg:px-0 mt-20 max-w-6xl w-full m-auto">
            {children}
        </main>
    )
}

export default LayoutWrapper