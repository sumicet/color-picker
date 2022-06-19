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
import { IoFootsteps, IoReload } from 'react-icons/io5';
import capitalize from 'lodash/capitalize';
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import { useStore } from '../store/useStore';
import { Slider } from './Slider';
import { ColorCard } from './ColorCard';
import { useOnDebouncedValue } from '../hooks/useOnDebouncedValue';
import { ColorPicker } from './ColorPicker';
import { useCallback, useEffect } from 'react';
import { Tooltip } from './Tooltip';
import { Checkbox } from '@chakra-ui/checkbox';

interface SettingsProps {
    name: string;
}

export function Settings({ name }: SettingsProps) {
    const generateColors = useStore(state => state.generateColors);
    const generatedColors = useStore(state => state.generatedColors[name]);
    const lockedTo = generatedColors.filterSettings?.lockedTo;
    const color = useStore(state => state.color);
    const activateColorLock = useStore(state => state.activateColorLock);
    const disableColorLock = useStore(state => state.disableColorLock);

    const [step, setStep] = useOnDebouncedValue(
        debouncedStep => generateColors({ type: name }, { step: debouncedStep }),
        generatedColors.filterSettings?.step || generatedColors.defaultStep
    );

    const [localColor, setLocalColor] = useOnDebouncedValue(
        debouncedLocalColor =>
            generateColors({ type: name, color: debouncedLocalColor }, undefined, {
                forceColor: true,
            }),
        color
    );

    useEffect(() => {
        if (!lockedTo) {
            setLocalColor(color);
        }
    }, [color, lockedTo]);

    useEffect(() => {
        if (lockedTo) {
            setLocalColor(lockedTo);
        }
    }, [lockedTo]);

    const handleResetClick = useCallback(() => {
        setLocalColor(color);
    }, [color, name, disableColorLock]);

    const handleCheckbox = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
                activateColorLock(name, localColor);
            } else {
                disableColorLock(name);
            }
        },
        [name, localColor, activateColorLock]
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
                <PopoverBody pt='space16'>
                    <VStack align='flex-start' spacing='space20'>
                        {/* TODO: Should be similar to the color picker */}
                        <VStack width='100%' align='flex-start' spacing='space12'>
                            <HStack spacing='space8'>
                                <Icon
                                    as={IoFootsteps}
                                    color='secondary.light'
                                    boxSize='icon.default'
                                />
                                <Text textStyle='text16' color='secondary.light'>
                                    Step
                                </Text>
                            </HStack>

                            <Slider value={step} onChange={setStep} />
                        </VStack>

                        <VStack width='100%' align='flex-start' spacing='space12'>
                            <VStack spacing='space4' align='flex-start' width='100%'>
                                <Flex flex={1} width='100%'>
                                    <Checkbox isChecked={!!lockedTo} onChange={handleCheckbox}>
                                        <Text textStyle='text16' color='secondary.light'>
                                            Color
                                        </Text>
                                    </Checkbox>
                                    <Flex flex={1} align='center' justify='flex-end'>
                                        <Tooltip label='Reset to default'>
                                            <Flex
                                                cursor='pointer'
                                                onClick={handleResetClick}
                                                align='center'
                                            >
                                                <Icon
                                                    as={IoReload}
                                                    color='secondary.medium'
                                                    boxSize='icon.default'
                                                    width='icon.default'
                                                    height='icon.default'
                                                    _hover={{ color: 'secondary.light' }}
                                                />
                                            </Flex>
                                        </Tooltip>
                                    </Flex>
                                </Flex>
                            </VStack>

                            <VStack
                                width='100%'
                                align='flex-start'
                                spacing='space12'
                                opacity={!lockedTo ? 0.4 : 1}
                                pointerEvents={!lockedTo ? 'none' : 'auto'}
                            >
                                <Text textStyle='text12' color='secondary.medium' fontWeight='bold'>
                                    Use a custom color for this filter
                                </Text>
                                <ColorCard color={localColor} size='30%' width='100%' />
                                <ColorPicker color={localColor} onChange={setLocalColor} />
                            </VStack>
                        </VStack>
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
