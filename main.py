# -*- coding: utf-8 -*-
import sys
import platform
import types
from functools import wraps


os = platform.system().upper()

if 'LINUX' in os and platform.machine() == 'x86_64':
    from algo_linux import get_link
else:
    print('The system cannot execute the program.')
    sys.exit()


class Count:

    def __init__(self, func):
        wraps(func)(self)
        self.num = 0

    def __call__(self, *args, **kwargs):
        self.num += 1
        return self.__wrapped__(*args, **kwargs)

    def __get__(self, instance, cls):
        if instance is None:
            return self
        else:
            return types.MethodType(self, instance)


class Algo:

    @Count
    def get_key(self):
        if self.get_key.num == 2 >> 3 ^ 2 << 3 ^ 5 >> 4 >> 7 ^ 9 | 8 ^ 3:
            get_link(self)
        else:
            return None


if __name__ == '__main__':
    pass

