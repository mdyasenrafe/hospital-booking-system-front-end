import React from 'react';
import {Box, Row, Text} from '../../atom';
import UserIcon from '../../../assets/icons/main/userIcon.svg';
import {useAuth} from '../../../hooks/useAuth';
import moment from 'moment';

export const MainHeader = () => {
  const {userData} = useAuth();
  return (
    <Box px="lg" pb="md">
      <Row justifyContent="space-between" alignItems="center">
        <Row alignItems="center">
          <Box width={40} height={40}>
            <UserIcon />
          </Box>
          <Box ml="sm">
            <Text variant="p2_medium" color="black">
              Welcome, Test User
            </Text>
          </Box>
        </Row>
        <Box>
          <Text color="black">{moment().format('LT')}</Text>
        </Box>
      </Row>
    </Box>
  );
};
