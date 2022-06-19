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
import { IoReload } from 'react-icons/io5';
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

function SettingsModal({ name }: SettingsProps) {
    const generateColors = useStore(state => state.generateColors);
    const settings = useStore(state => state.generatedColors[name]);
    const color = useStore(state => state.color);
    const activateColorLock = useStore(state => state.activateColorLock);
    const disableColorLock = useStore(state => state.disableColorLock);
    const lockedTo = useStore(state => state.generatedColors[name].lockedTo);

    const [step, setStep] = useOnDebouncedValue(
        debouncedStep => generateColors({ type: name, step: debouncedStep }),
        settings.step
    );

    const [localColor, setLocalColor] = useOnDebouncedValue(
        debouncedLocalColor =>
            generateColors({ type: name, color: debouncedLocalColor }, { forceColor: true }),
        color
    );

    useEffect(() => {
        if (!lockedTo) {
            setLocalColor(color);
        }
    }, [color, lockedTo]);

    useEffect(() => {
        if (lockedTo && lockedTo !== localColor) {
            setLocalColor(lockedTo);
        }
    }, [lockedTo]);

    const handleResetClick = useCallback(() => {
        setLocalColor(color);
        disableColorLock(name);
    }, [color, name]);

    return (
        <>
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
                <VStack align='flex-start' spacing='space20'>
                    <Text textStyle='text16' color='secondary.medium'>
                        Value @{settings.step}
                    </Text>
                    <Slider value={step} onChange={setStep} />

                    <VStack width='100%' align='flex-start' spacing='space12'>
                        <VStack spacing='space4' align='flex-start' width='100%'>
                            <Flex flex={1} width='100%'>
                                <Checkbox
                                    isChecked={!!lockedTo}
                                    onChange={event => {
                                        if (event.target.checked) {
                                            activateColorLock(name, localColor);
                                        } else {
                                            disableColorLock(name);
                                        }
                                    }}
                                >
                                    <Text textStyle='text16' color='secondary.light'>
                                        Custom color
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
        </>
    );
}

export function Settings(props: SettingsProps) {
    return (
        <Popover placement='top'>
            <PopoverTrigger>
                <Box cursor='pointer'>
                    {/* Not wrapping the Icon in a Box causes a weird placement bug */}
                    <Icon as={IoMdSettings} color='secondary.medium' boxSize='icon.default' />
                </Box>
            </PopoverTrigger>
            <PopoverContent>
                <SettingsModal {...props} />
            </PopoverContent>
        </Popover>
    );
}
