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
import { ColorCard } from './ColorCard';
import { useOnDebouncedValue } from '../hooks/useOnDebouncedValue';

export const Settings = ({ name }: { name: string }) => {
    const generateColors = useStore(state => state.generateColors);
    const settings = useStore(state => state.generatedColors[name]);
    const color = useStore(state => state.color);

    const [step, setStep] = useOnDebouncedValue(
        debouncedStep => generateColors({ type: name, step: debouncedStep }),
        settings.step
    );

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
                    <VStack align='flex-start' spacing='space16'>
                        <Text textStyle='text16' color='secondary.medium'>
                            Value @{settings.step}
                        </Text>
                        <Slider value={step} onChange={setStep} />
                        <ColorCard color={color} size='30%' width='100%' />
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
