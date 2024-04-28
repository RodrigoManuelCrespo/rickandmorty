import { Avatar, Chip, Divider } from "@nextui-org/react"

interface Props {
    title: string
    character?: CharacterType | null
    handleDismiss?: () => void
}

const TitleComponent: React.FC<Props> = ({ title, character, handleDismiss }: Props) => {
    return (
        <div className="mb-6">
            <div className="flex justify-between flex-wrap mb-4 gap-2">
                <h3 className="text-lg font-semibold">{title}</h3>
                {character && <Chip
                    color="primary"
                    onClose={handleDismiss}
                    avatar={
                        <Avatar
                            name={character.name}
                            src={character.image}
                        />
                    }
                >
                    {character.name}
                </Chip>}
            </div>
            <Divider></Divider>
        </div>
    )
}

export default TitleComponent