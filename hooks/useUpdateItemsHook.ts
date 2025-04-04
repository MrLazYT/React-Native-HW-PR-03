import { useDispatch } from "react-redux";
import { clear, plus } from "../app/slices/menuSlice";
import { useEffect } from "react";
import { useNavigation } from "expo-router";

export default function useUpdateItems(items: any[], condition: (item: any) => boolean) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isFocused = navigation.isFocused();

    function updateUncompletedTaskCount() {
        dispatch(clear());

        for (let item of items!) {
            if (condition(item)) {
                dispatch(plus());
            }
        }
    }

    useEffect(() => {
        (async () => {
            updateUncompletedTaskCount();
        })();
    }, [isFocused]);
}
