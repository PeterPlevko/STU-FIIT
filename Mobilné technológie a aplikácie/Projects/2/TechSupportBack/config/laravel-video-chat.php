<?php

return [
    'relation' => [
        'conversations'       => PhpJunior\LaravelVideoChat\Models\Conversation\Conversation::class,
    ],
    'user' => [
        'model' => App\User::class,
        'table' => 'users', // Existing user table name
    ],
    'table' => [
        'conversations_table'       => 'conversations',
        'messages_table'            => 'messages',
    ],
    'channel' => [
        'new_conversation_created' => 'new-conversation-created',
        'chat_room'                => 'chat-room',
    ]
];
