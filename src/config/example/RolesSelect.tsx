import { Icon, Image } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useGuildRolesQuery } from 'stores';
import { Params } from 'views/feature/FeatureView';
import { SelectField, useSelectOptions } from 'components/forms/SelectField';
import { BsPeopleFill } from 'react-icons/bs';
import { toRGB } from 'utils/common';

export function RolesSelect({
  value,
  onChange,
}: {
  value?: string;
  onChange: (role: string) => void;
}) {
  const { guild } = useParams<Params>();
  const rolesQuery = useGuildRolesQuery(guild);
  const { options, values } = useSelectOptions(rolesQuery.data, (role) => ({
    value: role.id,
    label: role.name,
    icon:
      role.icon?.iconUrl != null ? (
        <Image src={role.icon?.iconUrl} bg={toRGB(role.color)} w="25px" h="25px" />
      ) : (
        <Icon as={BsPeopleFill} color={toRGB(role.color)} w="20px" h="20px" />
      ),
  }));

  return (
    <SelectField
      placeholder="Select a role"
      value={value != null && options.get(value)}
      onChange={(e) => onChange(e.value)}
      options={values}
    />
  );
}
