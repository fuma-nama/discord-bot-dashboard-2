import { Flex } from '@chakra-ui/react';
import items from '../../sidebar';
import { SidebarResponsive, Sidebar } from '../../components/sidebar';
import AdminLayout from './AdminLayout';
import { QueryStatus } from 'components/panel/QueryPanel';
import { useSelfUserQuery } from 'stores';
import { LoadingPanel } from 'components/panel/LoadingPanel';

export default function AppLayout() {
  const query = useSelfUserQuery();

  return (
    <Flex direction="row" h="full">
      <Sidebar items={items} />
      <SidebarResponsive items={items} />
      <QueryStatus
        query={query}
        loading={<LoadingPanel size="sm" />}
        error="Failed to load user info"
      >
        <AdminLayout />
      </QueryStatus>
    </Flex>
  );
}
