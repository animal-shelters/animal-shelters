<?php

namespace App\Controller\User;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security as SecurityBundleSecurity;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[AsController]
class UserAuthController extends AbstractController
{
    
    #[Route(path: 'auth/user', methods: ['GET'])]
    public function __invoke(
        SecurityBundleSecurity $security,
        SerializerInterface $serializer
    ) {
        return new Response(
            $serializer->serialize($security->getUser(), 'jsonld')
        );
    }
}
