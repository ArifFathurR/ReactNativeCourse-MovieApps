import {ActivityIndicator, Image, ScrollView, Text, View} from "react-native";
import {images} from "../../../constants/images";
import {icons} from "../../../constants/icons";
import SearchBar from "@/components/SearchBar";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";

export default function Index() {
    const router = useRouter();
    const {data: movies,
            loading: moviesLoading,
            error: moviesError,
             } = useFetch(() => fetchMovies({
            query:''}
        ))
    return (

        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full" />

            <ScrollView className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                        contentContainerStyle={
                {
                    minHeight: "100%",
                    paddingBottom: 10
                }
                        }
            >
                <Image source={icons.logo} className="w-12 h-10 mt-10 mx-auto" />

                {moviesLoading ?
                    (<ActivityIndicator
                        size="large"
                        color="#000ff"
                        className="mt-10 self-center"/>)
                    : moviesError ?
                        (<Text>Error: {moviesError?.message}</Text>)
                        : (
                            <View className="flex-1 mt-5">
                                <SearchBar
                                    onPress={ ()=> router.push("/search")}
                                    placeholder="Search for a muvie"
                                />

                                <>
                                    <Text className="text-lg text-white font-bold mt-5 mb-3">Lastes Movies</Text>
                                </>
                            </View>
                        )
                }

            </ScrollView>
        </View>
    );
}