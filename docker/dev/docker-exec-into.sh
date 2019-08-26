#!/bin/bash

# Execs into the dev container

. ../env.env

docker exec -ti \
    $DEV_CONTAINERNAME \
    /bin/bash
