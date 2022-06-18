import Icon from '@chakra-ui/icon';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    PopoverHeader,
} from '@chakra-ui/popover';
import { IoMdSettings } from 'react-icons/io';
import capitalize from 'lodash/capitalize';
import { Box, HStack, Text, VStack } from '@chakra-ui/layout';
import { useStore } from '../store/useStore';
import { Slider } from './Slider';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from 'rooks';

export const Settings = ({ name }: { name: string }) => {
    const generateColors = useStore(state => state.generateColors);
    const settings = useStore(state => state.generatedColors[name]);

    const [step, setStep] = useState<number>(settings.step);
    const [debouncedStep] = useDebouncedValue(step, 50);

    useEffect(() => {
        if (debouncedStep === null) {
            return;
        }

        generateColors({ type: name, step: debouncedStep });
    }, [debouncedStep]);

    return (
        <Popover placement='top'>
            <PopoverTrigger>
                <Box cursor='pointer'>
                    {/* Not wrapping the Icon in a Box causes a weird placement bug */}
                    <Icon as={IoMdSettings} color='secondary.medium' boxSize='icon.default' />
                </Box>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow width={10} height={10} bg='primary.400' />
                <HStack>
                    <PopoverHeader>
                        <Text textStyle='text20' color='secondary.light'>
                            {capitalize(name)} settings
                        </Text>
                    </PopoverHeader>
                    {/* <PopoverCloseButton /> */}
                </HStack>
                <PopoverBody>
                    <VStack align='flex-start'>
                        <Text textStyle='text16' color='secondary.medium'>
                            Value @{settings.step}
                        </Text>
                        <Slider value={step} onChange={setStep} />
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
