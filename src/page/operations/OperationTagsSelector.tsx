import * as React from "react";
import AutoCompleteInput from "./AutoCompleteInput";
import {useState} from "react";


interface OperationTagsSelectorProps {
    onChange: (tags: string[]) => void
    tags: string[]
    allTags: string[][]
}

interface OperationTags {
    baseTags: string[],
    extraTags: string[],
    inputBaseTag: string,
    inputExtraTag: string
}

const OperationTagsSelector: React.FC<OperationTagsSelectorProps> = (
    {
        onChange,
        tags,
        allTags
    }
) => {

    const [operationTags, setOperationTags] = useState<OperationTags>({
        baseTags: tags,
        extraTags: [],
        inputBaseTag: "",
        inputExtraTag: "",
    });

    const getBaseTags = () => {
        const index = operationTags.baseTags.length;
        let filtered: string[][] = [];
        filtered = allTags.filter((coll) => coll.length > index);
        operationTags.baseTags.forEach((tag, index) => {
            filtered = filtered.filter(coll => coll[index] === tag);
        });
        return filtered.reduce(
            (accumulator, currentValue) => [...accumulator, currentValue[index]], []);
    };

    const getExtraTags = () => {
        return allTags.reduce(
            (accumulator: string[], currentValue) => [...accumulator, ...currentValue], []);
    };

    const onlyUnique = (value: string, index: number, array: string[]) => {
        return array.indexOf(value) === index;
    };

    const handleAutocompleteChange = (event: React.SyntheticEvent, newValue: string[] | string | null, inputId: string): void => {
        setOperationTags(prev => ({
            ...prev,
            [inputId]: newValue
        }));

        if (inputId === "baseTags" && Array.isArray(newValue)) {
            onChange([...newValue, ...operationTags.extraTags]);
        }

        if (inputId === "extraTags" && Array.isArray(newValue)) {
            onChange([...operationTags.baseTags, ...newValue]);
        }
    };

    return (
        <React.Fragment>
            <AutoCompleteInput
                id="baseTags"
                label="Base Tags"
                multiple={true}
                options={getBaseTags().filter(onlyUnique)}
                placeholder="Limited by existing tag order"
                margin="dense"
                error={false}
                variant={"outlined"}
                value={operationTags.baseTags}
                inputValue={operationTags.inputBaseTag}
                onChange={(e, newVal) => handleAutocompleteChange(e, newVal, "baseTags")}
                onInputChange={(e, newVal) => handleAutocompleteChange(e, newVal, "inputBaseTag")}
            />
            <AutoCompleteInput
                id="extraTags"
                label="Extra Tags"
                freeSolo={true}
                multiple={true}
                options={getExtraTags().filter(onlyUnique)}
                placeholder="Any value allowed"
                margin="dense"
                error={false}
                variant={"outlined"}
                value={operationTags.extraTags}
                inputValue={operationTags.inputExtraTag}
                onChange={(e, newVal) => handleAutocompleteChange(e, newVal, "extraTags")}
                onInputChange={(e, newVal) => handleAutocompleteChange(e, newVal, "inputExtraTag")}
            />
        </React.Fragment>
    )
};

export default OperationTagsSelector;
