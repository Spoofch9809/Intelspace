import { Box, Button, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react';
import { LANGUAGE_VERSIONS } from '../constants';
import "./LanguageSelector.css";
import React from 'react';


const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "blue.400";

const LanguageSelector = ({ language, onSelect }) => {
    return (
        <div className="language-selector-container">
            <Box className="language-selector-box">
                <Text className="language-label">Language:</Text>
                <Menu isLazy>
                    <MenuButton as={Button} className="language-button">
                        {language}
                    </MenuButton>
                    <MenuList className="menu-list" zIndex="modal">
                        {languages.map(([lang, version]) => (
                            <MenuItem
                                key={lang}
                                className={`menu-item ${lang === language ? "active" : ""}`}
                                onClick={() => onSelect(lang)}
                                color={lang === language ? ACTIVE_COLOR : ""} 
                                bg={lang === language ? "gray.700" : "transparent"}
                                _hover={{
                                    color: ACTIVE_COLOR,
                                    bg: "gray.900"
                                }}
                            >
                                {lang}
                                &nbsp;
                                <Text as="span" className="language-version">
                                    ({version})
                                </Text>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            </Box>
        </div>
    );
};

export default LanguageSelector;