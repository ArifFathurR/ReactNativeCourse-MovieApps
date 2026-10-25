
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    View,
} from "react-native";
import { useEffect, useState } from "react";
import { icons } from "../../../constants/icons";
import { images } from "../../../constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import SearchBar from "@/components/SearchBar";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
        refetch: loadMovies,
        reset,
    } = useFetch(
        () => fetchMovies({ query: searchQuery }),
        false
    );

    useEffect(() => {
        const query = searchQuery.trim();

        const timeout = setTimeout(() => {
            if (query) {
                loadMovies();
            } else {
                reset();
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchQuery]);

    const hasQuery = searchQuery.trim().length > 0;
    const hasMovies = Array.isArray(movies) && movies.length > 0;

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="absolute h-full w-full"
                resizeMode="cover"
            />

            <FlatList
                data={movies ?? []}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                className="px-5"
                columnWrapperStyle={{
                    justifyContent: "center",
                    gap: 16,
                    marginVertical: 16,
                }}
                contentContainerStyle={{
                    paddingBottom: 100,
                    flexGrow: 1,
                }}
                ListHeaderComponent={
                    <>
                        <View className="mt-20 w-full items-center justify-center">
                            <Image
                                source={icons.logo}
                                className="h-10 w-12"
                                resizeMode="contain"
                            />
                        </View>

                        <View className="my-5">
                            <SearchBar
                                placeholder="Search..."
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </View>

                        {moviesLoading && (
                            <ActivityIndicator
                                size="large"
                                color="#0000ff"
                                className="my-3"
                            />
                        )}

                        {moviesError && (
                            <Text className="my-3 px-5 text-red-500">
                                Error: {moviesError.message}
                            </Text>
                        )}

                        {!moviesLoading &&
                            !moviesError &&
                            hasQuery &&
                            hasMovies && (
                                <Text className="text-white">
                                    Search results for{" "}
                                    <Text className="text-accent">
                                        {searchQuery.trim()}
                                    </Text>
                                </Text>
                            )}
                    </>
                }
                ListEmptyComponent={
                    !moviesLoading && !moviesError ? (
                        <View className="mt-10 px-5">
                            <Text className="text-center text-white">
                                {hasQuery
                                    ? "No movies found"
                                    : "Search for movie"}
                            </Text>
                        </View>
                    ) : undefined
                }
            />
        </View>
    );
};

export default Search;
