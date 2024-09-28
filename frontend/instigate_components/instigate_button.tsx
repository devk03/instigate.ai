import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import { fetchInstigation } from "../instigate_functions/fetch_instigation";

const MOCK_MESSAGE = "1: humanities have a higher creative ceiling, 2: shut the fuck up";

export default function InstigateButton({ message }: { message: string }) {
    const [instigation, setInstigation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInstigation = async () => {
        setIsLoading(true);
        setError(null);
        const result = await fetchInstigation(MOCK_MESSAGE);
        console.log(result);
        setIsLoading(false);

        if (result.error) {
            setError(result.error);
        } else {
            setInstigation(result.instigation);
        }
    };

    return (
        <View>
            <Button
                title={isLoading ? "Loading..." : "Instigate"}
                onPress={handleInstigation}
                disabled={isLoading}
            />
            {instigation && <Text>{instigation}</Text>}
            {error && <Text style={{ color: "red" }}>{error}</Text>}
        </View>
    );
}
