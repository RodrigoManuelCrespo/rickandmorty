import { Divider } from "@nextui-org/react"

interface Props {
    title: string
}

const TitleComponent: React.FC<Props> = ({ title }: Props) => {
    return (
        <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <Divider></Divider>
        </div>
    )
}

export default TitleComponent