import { Box, Button, Heading, Input, VStack,Container,useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import useProductStore from "../store/product.js"; 
import { useToast } from "@chakra-ui/react";

const CreatePage=()=>{


    const [newProduct,setNewproduct]=useState({
        name:"",
        price:"",
        image:"",
        });

        const toast = useToast()

        const {createProduct}=useProductStore()
        const handleAddProduct=async()=>{
            const {success,message}=await createProduct(newProduct);
           if(!success){
            toast({
                title:"error",
                description:message,
                status:"error",
                duration:"error",
                isClosable:true

            })
           }else{
            toast({
                title: "success",
                description: message,
                status: "success",
                isClosable: true
            })
           }
           setNewproduct({name:"",price:"",image:""});
        }
    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={4}>
                    Create New Product
                </Heading>
                <Box
                    w={"full"}
                    bg={useColorModeValue("white", "grey.800")}
                    p={6}
                    rounded={"lg"}
                    shadow={"md"}
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder="Product Name"
                            name="name"
                            value={newProduct.name}
                            onChange={(e) =>
                                setNewproduct({ ...newProduct, name: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Product Price"
                            name="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) =>
                                setNewproduct({ ...newProduct, price: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Product Image URL"
                            name="image"
                            value={newProduct.image}
                            onChange={(e) =>
                                setNewproduct({ ...newProduct, image: e.target.value })
                            }
                        />
                        <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreatePage;