import {
    Accordion as ChakraAccordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    AccordionProps as ChakraAccordionProps,
} from '@chakra-ui/accordion';
import { Text } from '@chakra-ui/layout';
import { Children } from 'react';

interface AccordionProps extends ChakraAccordionProps {
    name: string;
}

export function Accordion({ name, children, ...props }: AccordionProps) {
    return (
        <ChakraAccordion allowMultiple allowToggle width='100%' defaultIndex={0} {...props}>
            <AccordionItem>
                <AccordionButton>
                    <Text textStyle='text20' color='secondary.light'>
                        {name}
                    </Text>
                    <AccordionIcon boxSize='25px' />
                </AccordionButton>
                <AccordionPanel marginTop='space16'>{children}</AccordionPanel>
            </AccordionItem>
        </ChakraAccordion>
    );
}
