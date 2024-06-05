function(add_resources library)
  set(sources)
  foreach (src ${ARGN})
    get_filename_component(name ${src} NAME)
    # Get short filename
    string(REGEX MATCH "([^/]+)$" symbol ${src})
    # Replace filename spaces & extension separator for C compatibility
    string(REGEX REPLACE "\\.| |-" "_" symbol ${symbol})
    # Convert to lower case
    string(TOLOWER ${symbol} symbol)

    set(src_file "${CMAKE_CURRENT_SOURCE_DIR}/${src}")
    set(cpp_file "${CMAKE_CURRENT_BINARY_DIR}/${library}/${symbol}.cpp")
    set(h_file "${CMAKE_CURRENT_BINARY_DIR}/${library}/${symbol}.h")

    set(bin2c_cmdline
            -DOUTPUT_C=${cpp_file}
            -DOUTPUT_H=${h_file}
            -DSYMBOL=${symbol}
            -DINPUT_FILE=${src_file}
            -P "${CMAKE_CURRENT_SOURCE_DIR}/cmake/bin2c.cmake")

    # Run bin2c on resource files
    add_custom_command(
            OUTPUT ${cpp_file} ${h_file}
            COMMAND ${CMAKE_COMMAND} ARGS ${bin2c_cmdline}
            DEPENDS ${src_file}
            COMMENT "Generating resource from ${src_file}"
            PRE_BUILD VERBATIM)
    list(APPEND sources ${cpp_file})
  endforeach ()

  add_library(${library} STATIC ${sources})
  target_include_directories(${library} PUBLIC "${CMAKE_CURRENT_BINARY_DIR}")
endfunction()

