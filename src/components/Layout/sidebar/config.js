import {
  Home,
  BarChart4,
  Calendar,
  FolderClosed,
  Inbox,
  Users2,
} from 'lucide-react'

export const navigation = [
  {
    name: 'Dashboard',
    href: '#',
    icon: Home,
    current: true,
  },
  {
    name: 'Team',
    href: '#',
    icon: Users2,
    current: false,
  },
  {
    name: 'Projects',
    href: '#',
    icon: FolderClosed,
    current: false,
  },
  {
    name: 'Calendar',
    href: '#',
    icon: Calendar,
    current: false,
  },
  {
    name: 'Documents',
    href: '#',
    icon: Inbox,
    current: false,
  },
  {
    name: 'Reports',
    href: '#',
    icon: BarChart4,
    current: false,
  },
]
