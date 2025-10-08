import { Container , VStack , Text, SimpleGrid} from "@chakra-ui/react";
import { use } from "react";
import { Link } from "react-router-dom";
import useProductStore from "../store/product.js";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";
const Homepage=()=>{
    const {fetchProducts, products}=useProductStore();
    useEffect(()=>{
        fetchProducts();
    },[fetchProducts]);
    console.log("products",products);
    return(
        <Container maxW='container.xl' py={12}>
            <VStack spacing={8}>
                <Text
                fontSize={"30"}
                fontWeight={"bold"}
                bgGradient={"linear(to-r,teal.400,blue.500)"}
                bgClip={"text"}
                textAlign={"center"}
                >Current Products
                </Text>
                <SimpleGrid columns={{
                    base:1,
                    md:2,
                    lg:3
                }}
                spacing={10}
                w={"full"}
                >
                    {products.map((product)=>(
                        <ProductCard key={product._id} product={product} />
                    ))}
                </SimpleGrid>
                {products.length===0&&(
                <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='grey.500'>
                No product Found 😢{" "}
                <Link to={"/create"}>
                <Text as='span' color='blue.500' _hover={{textDecoration:"underLine"}}>
                create a product
                </Text>
                </Link>
                </Text>
                )}
                
                
             </VStack>   
        </Container>
    )
}

export default Homepage;