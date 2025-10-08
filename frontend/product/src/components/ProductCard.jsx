// import { Box , Image, Heading, HStack,IconButton,Text, useColorModeValue,useToast, VStack, Input,useDisclosure} from '@chakra-ui/react'
// import { DeleteIcon ,EditIcon, Modal} from '@chakra-ui/icons'
// import { ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalFooter,Button } from '@chakra-ui/react'
// import useProductStore from '../store/product';
// import { useState } from 'react';
// const ProductCard=({product})=>{
//     const[updateProduct , setUpdatedProduct]=useState(product);
//     const textColor=useColorModeValue("grey.600","grey.200");
//     const bg=useColorModeValue("white","grey.800");

//     const {deleteProduct,updatedProduct}=useProductStore();
//     const toast=useToast(); 
//      const { isOpen, onOpen, onClose } = useDisclosure()
//     const handleDeleteProduct=async(pid)=>{
//         const {success,message}=await deleteProduct(pid);
//         if(!success){
//             toast({
//                 title:'error',
//                 description:message,
//                 status:'error',
//                 duration:5000,
//                 isClosable:true,
//             })

//         }else{
//             toast({
//                 title:'success',
//                 description:message,
//                 status:'success',
//                 duration:5000,
//                 isClosable:true,
//             })
//         }
//     };
//     const handleUpdatedProduct=async(pid,updatedProduct)=>{
//       await  updatedProduct(pid,updatedProduct);
//       onClose();
//     }
//     return(
//         <Box
//             shadow='lg'
//             rounded='lg'
//             overflow='hidden'
//             transition='all 0.3s'
//             _hover={{transform:"translateY(-5px)",shadow:"xl"}}
//             bg={bg}
//         >
//             <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover'/>

//             <Box p={4}>
//                 <Heading as='h3' size='md' mb={2}>
//                     {product.name}
//                 </Heading>
//                 <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
//                     ${product.price}
//                 </Text>
//                 <HStack spacing={2}>
//                  <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue'/>
//                  <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red'/>
//                 </HStack>
//             </Box>
//             <Modal isOpen={isOpen} onClose={onClose}>
//                 <ModalContent>
//                     <ModalHeader>update product</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>
//                         <VStack spacing={4}>
//                             <Input
//                             Placeholder='product name'
//                             name='name'
//                             value={updatedProduct.name}
//                             />
//                             <Input 
//                             placeholder='price'
//                             name='price'
//                             type='number'
//                             value={updatedProduct.price}
//                             />
//                             <Input
//                             placeholder='Image URL'
//                             name='image'
//                             value={updatedProduct.image}
//                             />
//                         </VStack>
//                     </ModalBody>
//                      <ModalFooter>
//                         <Button colorScheme='blue' mr={3} 
//                         onClick={()=>handleUpdatedProduct(product._id,updatedProduct)}
//                         >
//                          update
//                         </Button>
//                         <Button variant='ghost' onClick={onClose}>cancel</Button>
//           </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </Box>
//     )
// }
// export default ProductCard;








import { Box, Image, Heading, HStack, IconButton, Text, useColorModeValue, useToast, VStack, Input, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalFooter, Button } from '@chakra-ui/react';
import useProductStore from '../store/product';
import { useState } from 'react';

const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue("grey.600", "grey.200");
    const bg = useColorModeValue("white", "grey.800");

    const { deleteProduct, updatedProduct: updateProductInStore } = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        toast({
            title: success ? 'Success' : 'Error',
            description: message,
            status: success ? 'success' : 'error',
            duration: 5000,
            isClosable: true,
        });
    };

    const handleUpdatedProduct = async (pid, updatedProduct) => {
        await updateProductInStore(pid, updatedProduct);
        onClose();
    };

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>{product.name}</Heading>
                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>${product.price}</Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red' />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Product Name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                            <Input
                                placeholder='Price'
                                type='number'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                            <Input
                                placeholder='Image URL'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdatedProduct(product._id, updatedProduct)}>Update</Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ProductCard;
