import {
  IconButton,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
export function SearchBar(
  props: {
    input?: InputProps;
    onSearch?: () => void;
  } & InputGroupProps
) {
  // Pass the computed styles into the `__css` prop
  const { input, onSearch, ...rest } = props;
  // Chakra Color Mode
  const searchIconColor = useColorModeValue('gray.700', 'white');
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const inputText = useColorModeValue('gray.700', 'gray.100');
  return (
    <InputGroup {...rest}>
      <InputLeftElement>
        <IconButton
          aria-label="search"
          bg="inherit"
          borderRadius="inherit"
          _active={{}}
          variant="ghost"
          icon={<SearchIcon color={searchIconColor} w="15px" h="15px" />}
          onClick={onSearch}
        />
      </InputLeftElement>
      <Input
        variant="search"
        fontSize="sm"
        bg={inputBg}
        color={inputText}
        fontWeight="500"
        _placeholder={{ color: 'gray.400', fontSize: '14px' }}
        borderRadius="30px"
        placeholder="Search..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSearch();
        }}
        {...input}
      />
    </InputGroup>
  );
}
