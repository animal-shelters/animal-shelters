<?php

namespace App\Controller\MediaObject;

use App\Entity\MediaObject;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
class Create
{
    public function __invoke(Request $request): MediaObject
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }
        $mediaObject = new MediaObject();
        $mediaObject->setFile($uploadedFile);
        $mediaObject->setDomain($request->request->get('domain'));
        $mediaObject->setIsMain($request->request->get('isMain') === 'true');
        return $mediaObject;
    }
}
