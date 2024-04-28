'use client'

import { Avatar, Button, Card, CardBody, CardFooter, Chip, Divider, Image, useDisclosure } from "@nextui-org/react";
import { Modal, ModalContent, ModalBody, ModalFooter } from "@nextui-org/react";
import PaginatorComponent from "./PaginatorComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import TitleComponent from "./TitleComponent";
import { removeFirstCharacter, removeSecondCharacter, setFirstCharacter, setSecondCharacter } from "@/redux/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { toast } from 'sonner'

interface Props {
    title: string;
    characterNumber: 'firstCharacter' | 'secondCharacter';
}

const CharacterComponent: React.FC<Props> = ({ title, characterNumber }: Props) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [selectedCharacter, setSelectedCharacter] = useState<CharacterType | null>(null);
    const [characters, setCharacters] = useState<CharacterType[]>([]);
    const [paginationInfo, setPaginationInfo] = useState<any>(null);
    const dispatch = useAppDispatch();
    const character: CharacterType | null = useAppSelector(state => state.character[characterNumber]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (page?: string) => {
        try {
            const url = new URL("https://rickandmortyapi.com/api/character");
            page && url.searchParams.append("page", page);
            const response = await axios(url.toString());
            setCharacters([...response.data.results]);
            setPaginationInfo(response.data.info);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handlePageChange = (page: number) => {
        fetchData(String(page));
    };

    const handleModal = (character: CharacterType) => {
        onOpen();
        setSelectedCharacter(character);
    };

    const handleSelect = (character: CharacterType) => {
        toast.success(`Character selected: ${character.name}`, {
            duration: 2000,
        })
        isOpen && onClose()

        if (characterNumber == 'firstCharacter') {
            dispatch(setFirstCharacter(character));
            return
        }

        if (characterNumber == 'secondCharacter') {
            dispatch(setSecondCharacter(character));
            return
        }
    }

    const handleDismiss = () => {
        if (characterNumber == 'firstCharacter') {
            dispatch(removeFirstCharacter())
            return
        }

        if (characterNumber == 'secondCharacter') {
            dispatch(removeSecondCharacter());
            return
        }
    }

    return (
        <>
            <div>
                <TitleComponent title={character ? character.name : title} character={character} handleDismiss={handleDismiss} />
                <div className="gap-4 grid grid-cols-1  md:grid-cols-2">
                    {characters.length > 0 &&
                        characters.map((item: CharacterType) => {
                            return (
                                <Card shadow="sm" key={item.id} isPressable>
                                    <CardBody
                                        className="overflow-visible p-0"
                                        onClick={() => handleModal(item)}
                                    >
                                        <Image
                                            shadow="sm"
                                            radius="lg"
                                            alt={item.name}
                                            width={'100%'}
                                            className="w-full h-[220px] object-cover"
                                            src={item.image}
                                        />
                                        <Chip
                                            color="primary"
                                            size="sm"
                                            className="z-10	absolute top-2 right-2"
                                        >
                                            + Info
                                        </Chip>
                                    </CardBody>
                                    <CardFooter className="text-small flex-col items-start">
                                        <p className="text-left text-lg font-semibold mb-1 truncate">{item.name}</p>
                                        {item.status && <p className="text-default-500 mb-1 truncate">Status: {item.status}</p>}
                                        {item.species && <p className="text-default-500 truncate">Specie: {item.species}</p>}
                                        {item.id == character?.id ? <Button
                                            color="secondary"
                                            size="sm"
                                            variant="flat"
                                            className="mt-4"
                                            fullWidth
                                            onClick={handleDismiss}
                                        >
                                            Dismiss
                                        </Button> :
                                            <Button
                                                color="primary"
                                                size="sm"
                                                variant="flat"
                                                className="mt-4"
                                                fullWidth
                                                onClick={() => handleSelect(item)}
                                            >
                                                Select
                                            </Button>
                                        }
                                    </CardFooter>
                                </Card>
                            );
                        })}
                </div>
                {paginationInfo && (
                    <PaginatorComponent
                        currentPage={paginationInfo.currentPage}
                        totalPages={paginationInfo.pages}
                        onPageChange={handlePageChange}
                    />
                )}
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
                                <Button color="secondary" variant="light" onPress={onClose}  >
                                    Close
                                </Button>
                                {selectedCharacter && <Button color="primary" onPress={() => handleSelect(selectedCharacter)}>
                                    Select
                                </Button>}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default CharacterComponent;