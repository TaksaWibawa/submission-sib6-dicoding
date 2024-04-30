import React from 'react';
import { Grid, GridItem, Heading } from '@chakra-ui/react';
import { FaChartBar, FaComments } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { filterThreads, setSelectedTag, tagsSelector } from '@/stores/slices';
import { SearchBar } from './SearchBar';
import { MenuLinks } from './MenuLinks';

const MENU_ITEMS = [
  { menu: 'Threads', icon: <FaComments />, path: '/' },
  { menu: 'Leaderboard', icon: <FaChartBar />, path: '/leaderboards' },
];

export function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { selectedTag } = useSelector(tagsSelector);

  const handleSearch = (e) => {
    dispatch(setSelectedTag(e.target.value));
    dispatch(filterThreads(e.target.value));
  };

  return (
    <Grid
      as="nav"
      bgColor="dark.100"
      color="white"
      padding="1.25rem 2.5rem"
      position="sticky"
      top={0}
      zIndex={1000}
      templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }}
      templateRows={{ base: location.pathname === '/' ? 'repeat(2, 1fr)' : '1fr', lg: '1fr' }}
      columnGap={4}
      rowGap={4}
    >
      <GridItem
        align={{ base: 'center', lg: 'flex-start' }}
        my="auto"
        colSpan={{ base: '2', lg: '1' }}
        gridColumn={{ base: '1', lg: '1' }}
        gridRow={{ base: '1', lg: '1' }}
      >
        <Link to="/">
          <Heading
            as="h1"
            size="lg"
            _hover={{ textDecoration: 'underline' }}
          >
            Forum Discussion
          </Heading>
        </Link>
      </GridItem>
      {location.pathname === '/' && (
        <GridItem
          align="center"
          my="auto"
          gridColumn={{ base: '1', lg: '2' }}
          gridRow={{ base: '2', lg: '1' }}
          colSpan={{ base: '3', lg: '1' }}
        >
          <SearchBar
            onSearch={handleSearch}
            value={selectedTag}
          />
        </GridItem>
      )}
      <GridItem
        align="flex-end"
        my="auto"
        gridColumn={{ base: '1', lg: '3' }}
        gridRow={{ base: '1', lg: '1' }}
      >
        <MenuLinks menuItems={MENU_ITEMS} />
      </GridItem>
    </Grid>
  );
}
