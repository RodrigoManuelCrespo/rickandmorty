import { Button, Card, CardBody, CardFooter, Chip, Divider, Image, useDisclosure } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import PaginatorComponent from "./PaginatorComponent";
import { useState } from "react";

interface Props {
    characters: Array<CharacterType>;
    title: string;
}

const CharacterComponent: React.FC<Props> = ({ characters, title }: Props) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [selectedCharacter, setSelectedCharacter] = useState<CharacterType | null>(null)

    const handleClick = (item: any) => {
        onOpen()
        setSelectedCharacter(item)
    }

    return (
        <>
            <div>
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">{title}</h3>
                    <Divider></Divider>
                </div>
                <div className="gap-4 grid grid-cols-1  md:grid-cols-2">
                    {characters.length > 0 && characters.map((item: CharacterType) => {
                        return (
                            <Card shadow="sm" key={item.name} isPressable>
                                <CardBody
                                    className="overflow-visible p-0"
                                    onClick={() => handleClick(item)}
                                >
                                    <Image
                                        shadow="sm"
                                        radius="lg"
                                        alt={item.name}
                                        className="w-full"
                                        src={item.image}
                                    />
                                    <Chip
                                        color="primary"
                                        size="sm"
                                        className="z-10	absolute top-2 left-2"
                                    >
                                        + Info
                                    </Chip>
                                </CardBody>
                                <CardFooter className="text-small flex-col items-start">
                                    <div className="flex justify-between w-full">
                                        <p className="text-left text-lg">{item.name}</p>
                                        <Button
                                            color="primary"
                                            size="sm"
                                            variant="bordered"
                                            radius="full"
                                            className="max-md:hidden"
                                        >
                                            Seleccionar
                                        </Button>
                                    </div>
                                    {item.status && <p className="text-default-500">Status: {item.status}</p>}
                                    {item.species && <p className="text-default-500">Specie: {item.species}</p>}
                                    <Button
                                        color="primary"
                                        size="sm"
                                        variant="bordered"
                                        radius="full"
                                        className="md:hidden mt-4"
                                        fullWidth
                                    >
                                        Seleccionar
                                    </Button>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
                <PaginatorComponent />
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm" hideCloseButton={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <Image
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt={selectedCharacter?.name}
                                    className="w-full object-cover"
                                    src={selectedCharacter?.image}
                                />
                                <h3 className="font-semibold pt-2 text-2xl">{selectedCharacter?.name}</h3>
                                <Divider></Divider>
                                <p className="text-gray-500">
                                    Status: <span className="text-white">{selectedCharacter?.status}</span>
                                </p>
                                <p className="text-gray-500">
                                    Species: <span className="text-white">{selectedCharacter?.species}</span>
                                </p>
                                <p className="text-gray-500">
                                    Gender: <span className="text-white">{selectedCharacter?.gender}</span>
                                </p>
                                <p className="text-gray-500">
                                    Location: <span className="text-white">{selectedCharacter?.location.name}</span>
                                </p>
                                <p className="text-gray-500">
                                    Origin: <span className="text-white">{selectedCharacter?.origin.name}</span>
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Select
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default CharacterComponent