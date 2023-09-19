#!/bin/bash

hugo server --bind 0.0.0.0 --baseURL $(echo http://$(ifconfig | grep "inet " | grep -v 127.0.0.1 | cut -d\  -f2))
