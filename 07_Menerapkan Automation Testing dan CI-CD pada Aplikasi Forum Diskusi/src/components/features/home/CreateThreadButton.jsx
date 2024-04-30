import React from 'react';
import { Link } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';
import { ButtonFloating } from '@/components/buttons';

export function CreateThreadButton() {
  return (
    <Link to="/thread/create">
      <ButtonFloating
        name="Create New Thread"
        icon={<FaPencilAlt />}
        placement="left"
      />
    </Link>
  );
}
